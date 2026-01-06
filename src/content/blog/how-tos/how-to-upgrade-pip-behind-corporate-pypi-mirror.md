---
title: "How to Upgrade pip Behind a Corporate PyPI Mirror"
description: "Learn how to upgrade pip, setuptools, and wheel when external PyPI access is blocked and you rely on an internal mirror like Artifactory or Nexus."
date: 2026-01-02
tag: How-To
---

Picture this: You’re building a Docker image in a locked-down environment. External PyPI? Off-limits. Your only lifeline? A **corporate PyPI mirror**.

You confidently run:
```dockerfile
RUN python -m pip install --upgrade pip setuptools wheel
````

…and then the storm hits. Endless retries:

    Connection aborted: ConnectionResetError(104, 'Connection reset by peer')

Your build grinds to a halt. Why? Because pip is trying to reach **PyPI**, and your network says, “Nope.”

***

## The Root Cause

By default, `pip install --upgrade` fetches packages from PyPI unless you explicitly tell it otherwise. Even if your next command uses `--index-url` and `--trusted-host`, the first upgrade step doesn’t.

Result? A broken build and wasted time.

***

## The Fix: Point pip to Your Corporate Mirror

The solution is simple: **tell pip where to look and who to trust**—even for the upgrade step. Here’s the corrected Docker snippet:

```dockerfile
RUN python -m pip install --upgrade pip setuptools wheel \
      --index-url https://corporate-pypi-mirror/simple \
      --trusted-host corporate-pypi-mirror \
 && pip install \
      -i https://corporate-pypi-mirror/simple \
      --trusted-host corporate-pypi-mirror \
      --no-cache-dir \
      -r requirements.txt \
 && pip cache purge || true \
 && rm -rf /root/.cache/pip /tmp/* \
 && find /usr/local -type d -name "__pycache__" -prune -exec rm -rf {} +
```

Now both steps use your corporate mirror and trusted host. No more rogue PyPI calls.

***

## Better Approach: Configure Once

Instead of repeating flags, set environment variables:

```dockerfile
ENV PIP_INDEX_URL=https://corporate-pypi-mirror/simple \
    PIP_TRUSTED_HOST=corporate-pypi-mirror
```

Then your commands become clean:

```dockerfile
RUN python -m pip install --upgrade pip setuptools wheel \
 && pip install --no-cache-dir -r requirements.txt
```

***

## Extra Tips

*   **Pin Versions**: If your mirror doesn’t have the latest, specify known-good versions:
    ```dockerfile
    python -m pip install --upgrade "pip==24.3.1" "setuptools==72.2.0" "wheel==0.44.0"
    ```
*   **Avoid Unnecessary Downloads**:
    ```dockerfile
    python -m pip install --upgrade --only-if-needed pip setuptools wheel
    ```
*   **Use `pip.conf` for Global Settings**:
    ```dockerfile
    RUN printf "[global]\nindex-url = https://corporate-pypi-mirror/simple\ntrusted-host = corporate-pypi-mirror\n" > /etc/pip/pip.conf
    ```

***

## The Bottom Line

Corporate mirrors don’t have to mean broken builds. With the right configuration, you can upgrade pip and install dependencies seamlessly—even behind the strictest firewalls.

> “Control the index, control the chaos.”
