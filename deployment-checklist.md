# GregoryDCollins.com deployment checklist

## 1) Create the empty Gitea repo

Create a new empty repository in Gitea named `gregorydcollins-com`.

Do not initialize it with a README, license, or `.gitignore`.

## 2) Put this Astro project into your local directory

Project target:

```bash
/Users/gregory/Developer/Web/gregorydcollins-com
```

Copy the contents of this package into that directory.

## 3) Initialize Git locally and make the first commit

```bash
cd /Users/gregory/Developer/Web/gregorydcollins-com
git init
git branch -M main
git add .
git commit -m "Initial Astro scaffold for gregorydcollins.com"
```

## 4) Add your Gitea remote and push

Replace the example URL with your actual Gitea repo URL.

```bash
git remote add origin https://YOUR_GITEA_SERVER/YOUR_USER/gregorydcollins-com.git
git push -u origin main
```

## 5) Create the empty GitHub repo

Create a matching empty GitHub repository named `gregorydcollins-com`.

Do not initialize it.

## 6) Set up Gitea push mirror to GitHub

In Gitea:

- Open the repo
- Go to **Settings > Repository > Mirror Settings**
- Add the GitHub repository URL
- Under Authorization, enter your GitHub username and a GitHub personal access token
- Save the push mirror
- Trigger **Synchronize Now**

If available in your Gitea version, enable **Sync when new commits are pushed**.

## 7) Connect GitHub to Cloudflare Pages

In Cloudflare:

- Go to **Workers & Pages**
- Choose **Create application > Pages > Connect to Git**
- Select the GitHub repo `gregorydcollins-com`
- Build command: `npm run build`
- Build output directory: `dist`
- Save and deploy

## 8) Local verify loop

```bash
npm install
npm run dev
npm run build
```

## 9) When to start a new conversation

Start a new conversation when we switch from **scaffolding and deployment setup** to **site design/content refinement** or to **Cloudflare-specific troubleshooting**. That keeps context cleaner and easier to manage.
