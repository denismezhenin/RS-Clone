const getBottomBarHtml = () =>
  `
    <footer class="footer">
        <ul class="container__footer">
          <li>
            <p class="year">2023</p>
          </li>
          <li class="github">
            <a href="https://github.com/denismezhenin" target="_blank" class="github-link">
              <img src="../assets/icons/github.png" class="github-img">
              denismezhenin
            </a>
            <a href="https://github.com/Sashkakotov" target="_blank" class="github-link">
              <img src="../assets/icons/github.png" class="github-img">
              sashkakotov
            </a>
            <a href="https://github.com/alehharnizonau" target="_blank" class="github-link">
              <img src="../assets/icons/github.png" class="github-img">
              alehharnizonau
            </a>
            <a href="https://github.com/katsiaryna-andrabaila" target="_blank" class="github-link">
              <img src="../assets/icons/github.png" class="github-img">
              katsiaryna-andrabaila
            </a>
          </li>
          <li class="rs-logo">
            <a href="https://rs.school/js/" target="_blank"
              ><img class="logo-img" src="../assets/icons/logo-rs.svg" alt="rs-logo" 
            /></a>
          </li>
        </ul>
      </footer>
    `;

export default getBottomBarHtml;
