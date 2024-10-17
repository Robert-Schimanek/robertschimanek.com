---
title: "Supercharge Your Nextcloud: Boosting Max File Size on TrueNAS SCALE"
description: "Unlock the full potential of your Nextcloud on TrueNAS SCALE by increasing the maximum file upload size. Follow our comprehensive guide to handle those massive files with ease!"
date: 2024-03-18
tag: How-To
---

Ever tried to upload that massive video file or hefty photo archive to your Nextcloud, only to be met with a frustrating "file too large" error? Fear not! If you're running Nextcloud on TrueNAS SCALE, you're in the right place. This guide will walk you through boosting your upload limits, turning your Nextcloud into a file-handling powerhouse.

## Before We Dive In

Make sure you've got:
- Access to your TrueNAS SCALE's command line (SSH is your friend here)
- Nextcloud up and running on your TrueNAS SCALE setup

## Let's Supercharge That Upload Limit!

1. **Scout the Terrain** (List all containers)
   First, we need to get an overview of all running containers. SSH into your TrueNAS SCALE and run:
   ```bash
   sudo k3s kubectl get pod -o wide --all-namespaces
   ```
   This command breaks down as follows:
   - `sudo`: Run with administrative privileges
   - `k3s kubectl`: The Kubernetes command-line tool for TrueNAS SCALE
   - `get pod`: Retrieve information about pods (containers)
   - `-o wide`: Use the "wide" output format for more details
   - `--all-namespaces`: Show pods from all namespaces

   You'll see a list of all running containers. Look for a line containing "nextcloud" or "nextcloudraid".

2. **Find Your Nextcloud Pod**
   In the output from step 1, locate your Nextcloud pod. It should look something like this:
   ```
   ix-nextcloud   nextcloud-dbb87f68f-k4w69   1/1     Running   0   7d5h   10.42.0.123   truenas-scale   <none>
   ```
   Take note of the namespace (e.g., `ix-nextcloud`) and the pod name (e.g., `nextcloud-dbb87f68f-k4w69`).

3. **Beam me up, Scotty!** (Access the Nextcloud container)
   Use the pod name and namespace you found:
   ```bash
   sudo k3s kubectl exec -it nextcloud-dbb87f68f-k4w69 -n ix-nextcloud /bin/bash
   ```
   🚀 Pro Tip: Replace `nextcloud-dbb87f68f-k4w69` and `ix-nextcloud` with your actual pod name and namespace.

   This command breaks down as:
   - `sudo k3s kubectl`: Run Kubernetes commands with admin rights
   - `exec`: Execute a command in a container
   - `-it`: Interactive terminal mode
   - `nextcloud-dbb87f68f-k4w69`: Your Nextcloud pod name
   - `-n ix-nextcloud`: The namespace of your Nextcloud pod
   - `/bin/bash`: Open a bash shell in the container

2. **Gear up with nano** (because every hero needs their tools)
   ```bash
   apt update && apt install nano -y
   ```
   This step is like packing your backpack before an adventure - you'll need to do it each time you enter the container.

3. **Navigate to Nextcloud HQ**
   ```bash
   cd /var/www/html
   ```

4. **Time to tweak the settings**
   ```bash
   nano .htaccess
   ```
   Think of this as opening up the control panel of your Nextcloud spaceship.

5. **Unleash the power!** Add these lines at the end of the file:
   ```apache
   php_value upload_max_filesize 16G
   php_value post_max_size 16G
   php_value memory_limit 16G
   php_value max_input_time 3600
   php_value max_execution_time 3600
   ```
   We're setting the upload limit to a whopping 16GB and giving your server a full hour to process those chunky files. Feel free to adjust these numbers to fit your needs!

6. **Save and exit** (In nano, hit Ctrl+X, then Y, then Enter)

7. **Wake up, Apache!**
   ```bash
   service apache2 restart
   ```
   This is like giving your server a quick reboot to apply the new superpowers.

8. **Mission accomplished!** Time to head back:
   ```bash
   exit
   ```

## Did It Work? Let's Check!

To see your handiwork in action, visit your Nextcloud's admin page:

```
https://your-nextcloud-domain.com/settings/admin/serverinfo
```

Look for the "Max upload size" - it should now show your new, improved limit. Congratulations, you've just unlocked Nextcloud's hidden potential!

## One Last Thing...

Remember, these awesome changes might disappear if your Nextcloud container gets rebuilt or updated. To keep your superpowers permanent, consider setting up a persistent volume for your Nextcloud config. It's like saving your game progress - your settings will stick around even if the server restarts.

Now go forth and upload those massive files with confidence! Your Nextcloud is ready for anything you throw at it. 🚀📁
