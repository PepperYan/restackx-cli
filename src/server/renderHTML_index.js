import { detectIsIOSDevice } from './utils'
import _            from 'lodash';

export default function renderHTML({ componentHTML, initialState, metaData, config, staticNames }) {

  const staticConfig = staticNames.reduce(function(all,each){
    const cssTag = all.csses + `\n <link rel="stylesheet" href="${config.staticUrl}/${each}.css">`
    const jsTag = all.jses + `\n <script src="${config.staticUrl}/${each}.js"></script>`
    return {csses: cssTag,jses: jsTag }
  },{csses:"", jses:""});

  // const bundle = config.staticUrl == "" ? "" : '<script src="/vendors.bundle.js"></script>';

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, height=device-height,initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>${config.title}</title>

    ${staticConfig.csses}
  </head>
  <style media="screen">
    html{ background: #ecf0f5; }
    .skin-blue .wrapper{ background: #ecf0f5; }
  </style>
  <body class="skin-blue sidebar-mini" style="margin: 0;">

    <div id="react-view" class="wrapper">${componentHTML}</div>


    ${staticConfig.jses}

  </body>

  </html>
  `;

}
