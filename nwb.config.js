module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'RecordGalleryCard',
      externals: {
        react: 'React'
      }
    }
  }
}
