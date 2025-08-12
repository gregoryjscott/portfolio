import { join } from "path"
import { readFileSync } from "fs"
import puppeteer from "puppeteer"

async function generateResumePDF(): Promise<void> {
  console.log("Generating resume PDF...")

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  })

  const page = await browser.newPage()

  await page.setViewport({
    width: 1200,
    height: 800,
    deviceScaleFactor: 2,
  })

  const resumeUrl =
    "file://" + join(process.cwd(), "_site", "resume", "index.html")
  console.log("Loading resume from:", resumeUrl)

  await page.goto(resumeUrl, {
    waitUntil: "networkidle0",
    timeout: 30000,
  })

  const cssFiles = [
    "_site/assets/css/normalize.css",
    "_site/assets/css/theme.css",
    "_site/assets/css/styles.css",
    "_site/assets/css/menu.css",
  ]
  for (const cssFile of cssFiles) {
    try {
      const cssPath = join(process.cwd(), cssFile)
      const cssContent = readFileSync(cssPath, "utf8")
      await page.addStyleTag({ content: cssContent })
      console.log("Loaded CSS:", cssFile)
    } catch (error) {
      console.warn("Could not load CSS:", cssFile)
    }
  }

  await page.evaluate(() => {
    const baseUrl = "https://gregoryjscott.com"
    const links = document.querySelectorAll('a[href^="/"]')
    links.forEach(link => {
      const href = link.getAttribute("href")
      if (href && href.startsWith("/")) {
        link.setAttribute("href", baseUrl + href)
      }
    })
  })

  await page.addStyleTag({
    content: `
        header.menu,
        .menu-checkbox,
        .menu-btn,
        .menu-overlay,
        .details,
        footer,
        .resume nav {
          display: none !important;
          visibility: hidden !important;   
        }
        
        html {
          font-size: .6rem;
        }

        body {
          background: white !important;
        }

        h1 {
          margin-top: -40px !important;
        }

        h2 {
          margin-top: 4rem;
        }

        h3 {
          margin-top: 3rem;
        }

        h4 {
          margin-top: 2rem;
        }

        h2.break {
          page-break-before: always;
        }

        h3 {
          break-after: avoid !important;
          page-break-after: avoid !important;
        }

        @page {
          margin: 0.5in !important;
        }
      `,
  })

  const pdfPath = join(process.cwd(), "gregory-scott-resume.pdf")
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "0.5in",
      right: "0.5in",
      bottom: "0.75in",
      left: "0.5in",
    },
    preferCSSPageSize: false,
    displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: `
      <div style="font-family: 'Roboto Mono', monospace; font-size: 10px; margin: 0 auto; text-align: center; width: 100%; color: #666;">
        Gregory J. Scott - <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
  })

  console.log("PDF generated successfully:", pdfPath)
  await browser.close()
}

generateResumePDF().catch(error => {
  console.error("Failed to generate PDF:", error)
  process.exit(1)
})
