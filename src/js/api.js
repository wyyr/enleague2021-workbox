import {baseUrl, token} from '../config.js';

const fetchRequest = (url) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'X-Auth-Token': token,
      },
    };

    return caches.match(baseUrl + url).then((response) =>{
      if (response) {
        return response.json().then((data) => {
          return resolve(data);
        });
      }

      return fetch(baseUrl + url, options)
          .then((res) => res.json())
          .then((result) => resolve(result))
          .catch((e) => reject(e));
    });
  });
};

const getLiga = () => {
  return new Promise((resolve, reject) => {
    fetchRequest('competitions/2021/standings')
        .then((result) => {
          resolve(result);
        })
        .catch((e) => reject(e));
  });
};

const getTeam = (idTeam) => {
  return new Promise((resolve, reject) => {
    const url = (idTeam) ? `teams/${idTeam}` : 'competitions/2021/teams';
    fetchRequest(url)
        .then((result) => {
          resolve(result);
        })
        .catch((e) => reject(e));
  });
};

const getMatch = () => {
  return new Promise((resolve, reject) => {
    fetchRequest('competitions/2021/matches?matchday=38')
        .then((result) => {
          resolve(result);
        })
        .catch((e) => reject(e));
  });
};

const getPageHome = () => {
  getLiga().then(({competition, season, standings}) => {
    const competitionElement = document.querySelector('.competition');
    const seasonElement = document.querySelector('.season');
    const standingsElement = document.querySelector('.standings');
    const cardCompetition = `
      <table>
        <tr>
          <th>Area</th>
          <td>${competition.area.name}</td>
        </tr>
        <tr>
          <th>Code</th>
          <td>${competition.code}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>${competition.name}</td>
        </tr>
        <tr>
          <th>Plan</th>
          <td>${competition.plan}</td>
        </tr>
      </table>
    `;
    const cardSeason = `
      <table>
        <tr>
          <th>Current Match Day</th>
          <td>${season.currentMatchday}</td>
        </tr>
        <tr>
          <th>Winner</th>
          <td>${season.winner || 'Not Available'}</td>
        </tr>
        <tr>
          <th>Start Date</th>
          <td>${season.startDate}</td>
        </tr>
        <tr>
          <th>End Date</th>
          <td>${season.endDate}</td>
        </tr>
      </table>
    `;
    let cardStandings = '';
    for (const item of standings) {
      cardStandings += `
        <div class="col s12 m4 l4">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">${item.stage}</span>
              <p>${item.type} : ${item.table.length}</p>
            </div>
          </div>
        </div>
      `;
    }

    competitionElement.innerHTML = cardCompetition;
    seasonElement.innerHTML = cardSeason;
    standingsElement.innerHTML = cardStandings;
  }).catch((e) => {
    throw new Error(e);
  });
};

const getDetailTeam = (id) => {
  return new Promise((resolve, reject) => {
    getTeam(id).then((team) => {
      const teamElement = document.querySelector('#team-content .detail-team');
      const cardTeam = document.createElement('div');
      const cardContent = document.createElement('div');
      const col = document.createElement('div');
      const col2 = document.createElement('div');
      const tableTitle = document.createElement('h5');
      const tableSquad = document.createElement('table');
      const tableSquadHeader = document.createElement('tr');

      cardTeam.classList.add('card');
      cardContent.classList.add('card-content', 'overflow-auto');

      col.classList.add('col', 's12');
      col.innerHTML = `
          <div class="row d-flex flex-lg-row">
            <div class="col s12 m4">
              <img src="${team.crestUrl}" alt="${team.name} Image" width="100%">
            </div>
            <div class="col s12 m8">
              <table class="striped">
                <tr>
                  <th>Club Name</th>
                  <td>${team.name}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>${team.address}</td>
                </tr>
                <tr>
                  <th>Founded</th>
                  <td>${team.founded}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>
                    <a href="${team.website}" target="_blank">${team.website}</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
      `;

      col2.classList.add('col', 's12');
      tableTitle.classList.add('mt-2');
      tableTitle.innerHTML = 'Squad List';
      tableSquadHeader.innerHTML = `
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Nationality</th>
          </tr>
        `;
      tableSquad.appendChild(tableSquadHeader);
      for (const squad of team.squad) {
        const squadItem = document.createElement('tr');
        squadItem.innerHTML = `
            <tr>
              <td>${squad.name}</td>
              <td>${squad.position || 'None'}</td>
              <td>${squad.nationality}</td>
            </tr>
          `;
        tableSquad.appendChild(squadItem);
      }
      tableSquad.classList.add('highlight');
      col2.appendChild(tableTitle);
      col2.appendChild(tableSquad);

      // teamElement.innerHTML = '';
      cardContent.appendChild(col);
      cardContent.appendChild(col2);
      cardTeam.appendChild(cardContent);
      teamElement.appendChild(cardTeam);

      resolve(team);
    });
  });
};

const getPageTeam = () => {
  getTeam().then(({teams}) => {
    const teamElement = document.querySelector('.team');
    let dataTeams = '';
    for (const team of teams) {
      dataTeams += `
        <div class="col s12 m4 l3">
          <a href="./detail-team.html?id=${team.id}">
            <div class="card small">
                <div class="card-image waves-effect waves-block waves-light">
                  <img src="${team.crestUrl || ''}" alt="${team.name} Image">
                </div>
              <div class="card-content">
                <span class="card-title truncate">${team.name}</span>
                <p>${team.address.substring(0, 20)} ...</p>
              </div>
            </div>
          </a>
        </div>
      `;
    }

    teamElement.innerHTML = dataTeams;
  });
};

const getPageMatch = () => {
  getMatch().then(({matches}) => {
    const matchElement = document.querySelector('.match');

    let cardMatch = '';
    for (const match of matches) {
      cardMatch += `
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <table class="table-responsive striped">
                <tr>
                  <th width="40%">Stage</th>
                  <td>${match.stage}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>${match.status}</td>
                </tr>
                <tr>
                  <th>Home Team</th>
                  <td>
                    <a href="detail-team.html?id=${match.homeTeam.id}">${match.homeTeam.name}</a>
                  </td>
                </tr>
                <tr>
                  <th>Away Team</th>
                  <td>
                    <a href="detail-team.html?id=${match.awayTeam.id}">${match.awayTeam.name}</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      `;
    }

    matchElement.innerHTML = cardMatch;
  });
};

export {
  getPageHome,
  getPageTeam,
  getPageMatch,
  getDetailTeam,
};
