import {getDetailTeam} from './api.js';
import {addFavoriteTeam, getBookmarkById, removeFavoriteTeam} from './db.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = parseInt(urlParams.get('id'));
    const btnSave = document.getElementById('btnSave');
    const preloader = document.querySelector('.preloader');

    if (idParam) {
      const team = await getDetailTeam(idParam);
      preloader.style.display = 'none';
      const data = await getBookmarkById(idParam);
      let saved;
      if (data === undefined) {
        btnSave.firstElementChild.innerHTML = 'bookmark_border';
        saved = false;
      } else {
        btnSave.firstElementChild.innerHTML = 'bookmark';
        saved = true;
      }
      btnSave.addEventListener('click', () => {
        if (!saved) {
          btnSave.firstElementChild.innerHTML = 'bookmark';
          saved = true;
          addFavoriteTeam(team);
          M.toast({html: 'Team berhasil di simpan!'});
        } else {
          btnSave.firstElementChild.innerHTML = 'bookmark_border';
          saved = false;
          removeFavoriteTeam(idParam);
          M.toast({html: 'Team berhasil di hapus!'});
        }
      });
    }
  } catch (e) {
    throw new Error(e);
  }
});
