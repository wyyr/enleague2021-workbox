import {getBookmarks} from './db.js';
import './fonts.js';
import '../css/style.css';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    if (window.location.pathname === '/bookmarks.html') {
      const results = await getBookmarks();
      const bookmarkElement = document.querySelector('#bookmarks .row-content');
      if (results.length > 0) {
        let cardBookmark = '';

        for (const data of results) {
          cardBookmark += `
                <div class="col s12 m6 l6">
                  <a href="./detail-team.html?id=${data.id}">
                    <div class="card small">
                        <div class="card-image waves-effect waves-block waves-light">
                          <img src="${data.crestUrl}" alt="${data.name} Image">
                        </div>
                      <div class="card-content">
                        <span class="card-title truncate">${data.name}</span>
                        <p>${data.address.substring(0, 20)} ...</p>
                      </div>
                    </div>
                  </a>
                </div>
              `;
        }

        bookmarkElement.innerHTML = cardBookmark;
      } else {
        bookmarkElement.innerHTML = '<h5 class="mt-2 center-align">No Bookmarks</h5>';
      }
    }
  } catch (e) {
    throw new Error(e);
  }
});
