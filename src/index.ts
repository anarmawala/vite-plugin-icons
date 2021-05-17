import fs from 'fs'
import util from 'util'
import path from 'path'
import { Plugin } from 'vite'
import svg2img, { svg2imgOptions } from 'svg2img'

export type LoadIconOptions = {
  src: string
  prefix?: string
}

export const LoadIcon = ({ src, prefix = 'icon' }: LoadIconOptions): Plugin => {
  let filename = path.basename(src)

  return {
    name: LoadIcon.toString(),

    async generateBundle(this, _opt, bundle, _isWrite) {
      try {
        // * Get the buffer for the original svg
        const svg_logo = fs.readFileSync(src).toString()

        // * Write original svg to the bundle
        bundle[filename] = {
          fileName: filename,
          name: filename,
          type: 'asset',
          isAsset: true,
          source: svg_logo,
        }

        for (const size of [32, 128, 256, 512]) {
          const icon_filename = `${prefix}-${size}x${size}.png`

          // * Convert the svg to the appropriate sized png
          const convertor = util.promisify<string, svg2imgOptions, Buffer>(svg2img)
          const source = await convertor(svg_logo, { width: size, height: size })

          bundle[icon_filename] = {
            fileName: icon_filename,
            name: icon_filename,
            type: 'asset',
            isAsset: true,
            source,
          }
        }
      } catch (e) {
        console.trace(e)
        this.error(e)
      }
    },

    transformIndexHtml(html) {
      html = html.replace('</head>', `<link rel="icon" href="${filename}" type="image/svg"></head>`)

      for (const size of [32, 128, 256, 512]) {
        const icon_filename = `${prefix}-${size}x${size}.png`

        html = html.replace(
          '</head>',
          `<link rel="icon" href="${icon_filename}" type="image/png", sizes="${`${size}x${size}`}"></head>`
        )
      }

      return html
    },
  }
}
