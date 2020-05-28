const importAll = (r) => {
  return r.keys().map(r);
};

importAll(require.context('../assets/fonts/material-icons/', false, /\.(png|jpe?g|svg|eot|ttf|woff|woff2)$/));
importAll(require.context('../assets/icons/', false, /\.(png|jpe?g|svg|eot|ttf|woff|woff2)$/));
