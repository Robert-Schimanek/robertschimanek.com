---
title: "Secure Your Nextcloud: Setting Trusted Domains on TrueNAS SCALE"
description: "Boost your Nextcloud security on TrueNAS SCALE by configuring trusted domains. Follow our user-friendly guide to ensure safe access from all your intended URLs!"
date: 2024-03-18
tag: How-To
---

Ever tried accessing your Nextcloud from a new domain, only to be greeted by an ominous "Access through untrusted domain" message? Don't worry! If you're running Nextcloud on TrueNAS SCALE, you're in the right place. This guide will walk you through setting up trusted domains, turning your Nextcloud into a fortress of security while keeping it accessible.

## Before We Dive In

Make sure you've got:
- Administrative access to your TrueNAS SCALE system
- Nextcloud up and running on your TrueNAS SCALE setup
- SSH access to your TrueNAS SCALE's command line

## Let's Secure That Nextcloud!

1. **Scout the Terrain** (List all containers)
   First, we need to get an overview of all running containers. SSH into your TrueNAS SCALE and run:
   ```bash
   sudo k3s kubectl get pod -o wide --all-namespaces
   ```
   Let's break this command down:
   - `sudo`: Run the command with administrative privileges
   - `k3s`: The lightweight Kubernetes distribution used by TrueNAS SCALE
   - `kubectl`: The command-line tool for interacting with Kubernetes clusters
   - `get pod`: Retrieve information about pods (containers) in the cluster
   - `-o wide`: Use the "wide" output format, which provides more detailed information
   - `--all-namespaces`: Show pods from all namespaces, not just the default one

   This command gives you a comprehensive list of all containers running in your TrueNAS SCALE system, including their status, IP addresses, and the nodes they're running on.

2. **Find Your Nextcloud Pod**
   In the output, look for a line containing "nextcloud". It'll look something like this:
   ```
   ix-nextcloud   nextcloud-dbb87f68f-k4w69   1/1     Running   0   7d5h   10.42.0.123   truenas-scale   <none>
   ```
   Here's what each column means:
   - `ix-nextcloud`: The namespace where the pod is running
   - `nextcloud-dbb87f68f-k4w69`: The unique name of the pod
   - `1/1`: Shows that 1 out of 1 containers in the pod are running (it's healthy)
   - `Running`: The current status of the pod
   - `0`: The number of times the pod has restarted
   - `7d5h`: How long the pod has been running
   - `10.42.0.123`: The internal IP address of the pod
   - `truenas-scale`: The node where the pod is running

3. **Beam me up, Scotty!** (Access the Nextcloud container)
   Use the pod name and namespace you found:
   ```bash
   sudo k3s kubectl exec -it nextcloudraid-dbb87f68f-k4w69 -n ix-nextcloudraid /bin/bash
   ```
   This command is doing quite a bit, so let's break it down:
   - `sudo k3s kubectl`: Run a Kubernetes command with admin rights
   - `exec`: Execute a command in a container
   - `-it`: Two flags combined:
     - `-i`: Keep STDIN open even if not attached
     - `-t`: Allocate a pseudo-TTY (essentially, give us an interactive terminal)
   - `nextcloud-dbb87f68f-k4w69`: The name of your Nextcloud pod
   - `-n ix-nextcloud`: Specify the namespace where the pod is running
   - `/bin/bash`: The command to run inside the container (open a bash shell)

   This command opens up an interactive bash session inside your Nextcloud container, allowing you to make changes directly.

4. **Gear up with nano** (because every hero needs their tools)
   ```bash
   apt update && apt install nano -y
   ```
   This command does two things:
   - `apt update`: Refreshes the list of available packages and their versions
   - `apt install nano -y`: Installs the nano text editor
     - `-y`: Automatically answer "yes" to prompts during installation

   We need to do this each time because containers are designed to be stateless and changes don't persist after restarts.

5. **Navigate to Nextcloud's Secret Vault**
   ```bash
   cd /var/www/html/config
   ```

6. **Time to tweak the settings**
   ```bash
   nano config.php
   ```
   Think of this as opening up the security panel of your Nextcloud fortress.

7. **Fortify the Gates!** Find the `trusted_domains` array and modify it like this:
   ```php
   'trusted_domains' =>
   array (
     0 => 'localhost',
     1 => '192.168.178.99',
     2 => 'my.domain.net',
     3 => 'my.second.domains.ddnss.de',
     4 => 'another.domain.online',
   ),
   ```
   Add all the domains and IP addresses you want to access your Nextcloud from. It's like giving out VIP passes to your Nextcloud party!

8. **Save and exit** (In nano, hit Ctrl+X, then Y, then Enter)

9. **Wake up, Apache!**
   ```bash
   service apache2 restart
   ```
   This is like telling your bouncer to update the VIP list.

10. **Mission accomplished!** Time to head back:
    ```bash
    exit
    ```

## Did It Work? Let's Check!

Try accessing your Nextcloud from all the domains you added. You should be able to waltz right in without any "untrusted domain" warnings. If you see any warnings in your Nextcloud logs about untrusted domains, double-check your `config.php` file.

## One Last Thing...

Remember, these awesome changes might disappear if your Nextcloud container gets rebuilt or updated. To keep your security settings permanent, consider setting up a persistent volume for your Nextcloud config. It's like engraving your security rules in stone - they'll stick around even if the server restarts.

Now go forth and access your Nextcloud with confidence from all your domains! Your digital fortress is secure and ready for action. 🏰🛡️
