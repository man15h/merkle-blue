import pkg from './package';
export default {
  mode: 'spa',
  srcDir: 'app/',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/css/tailwind.css',
    { src: '@/assets/css/main.scss', lang: 'scss' }
  ],
  plugins: [
    '@/plugins/fetch',
    '@/plugins/vue2-filters',
    '@/plugins/vue-moment',
    '@/plugins/merkle-blue',
    '@/plugins/constant',
    '@/plugins/vue-notify'
  ],
  modules: [],
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
