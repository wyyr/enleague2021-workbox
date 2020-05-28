import {getPageHome, getPageTeam, getPageMatch} from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidenavElement = document.querySelector('.sidenav');
  const preloader = document.querySelector('.preloader');

  const ajaxRequest = (options) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const {method, url} = options;

      xhr.open(method, url, true);
      xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
          resolve(this);
        }
      };
      xhr.send();
    });
  };

  const loadNav = () => {
    const options = {
      method: 'GET',
      url: './templates/nav.html',
    };
    ajaxRequest(options)
        .then((res) => {
          document.querySelectorAll('.sidenav, .top-nav').forEach((el) => {
            el.innerHTML = res.responseText;
            document.querySelectorAll('.sidenav .main-link, .top-nav .main-link').forEach((item) => {
              item.addEventListener('click', (event) => {
                M.Sidenav.getInstance(sidenavElement).close();
                getPage(event.target.getAttribute('href').substr(1));
              });
            });
          });
        })
        .catch((e) => {
          throw new Error(e);
        });
  };

  // load page
  const loadPage = (page) => {
    preloader.style.display = 'block';
    const options = {
      method: 'GET',
      url: `./templates/${page}.html`,
    };
    ajaxRequest(options)
        .then((res) => {
          const content = document.querySelector('#main-content');
          if (res.status === 200) {
            content.innerHTML = res.responseText;
            if (page === 'home') {
              getPageHome();
            } else if (page === 'team') {
              getPageTeam();
            } else if (page === 'match') {
              getPageMatch();
            }

            preloader.style.display = 'none';
          } else if (res.status === 404) {
            content.innerHTML = '<h5 class="center-align mt-2">404 | Halaman tidak ditemukan</h5>';
          } else {
            content.innerHTML = '<h5 class="center-align mt-2">Halaman tidak dapat diakses!</h5>';
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
  };

  const getPage = (target) => {
    let page = target;
    if (page === '') page = 'home';
    return loadPage(page);
  };

  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    getPage(window.location.hash.substr(1));
  }

  loadNav();
  M.Sidenav.init(sidenavElement);
});
