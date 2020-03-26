const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const express = require('express')

const server = express()

server.use(express.static('../dist'))

server.get('*', (req, res) => {
  const data = {
    url: req.url,
    name: '33',
    size: 5,
    city: ['东莞']
  }
  const app = new Vue({
    data,
    template: `<div id="app">访问的地址是：{{ url }} <span v-for="item of city" :key="item">{{item}}</span></div>`
  })

  const context = {
    title: 'hello',
    meta: `
      <meta name="key" content="hello">
    `,
    context: JSON.stringify(data)
  }

  const stream = renderer.renderToStream(app, context)
  let html = ''
  stream.on('data', data => {
    html += data.toString()
  })
  stream.on('end', () => {
    res.end(html)
  })
  stream.on('error', (err) => {
    res.status(500).end('Internal Server Error.')
  })


  // renderer.renderToString(app, context, ((err, html) => {
  //   if (err) {
  //     res.status(500).end('Internal Server Error.')
  //     return
  //   }
  //   res.end(html)
  // }))
})

server.listen('8080')