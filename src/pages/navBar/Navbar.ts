const Navbar = {
  render: async () => {
    const view = `
                <div class="header__wrapper">
                    <div class="navbar-menu " >
                        <div class="navbar-start">
                            <a class="navbar" href="/#">
                            Home
                            </a>
                        </div>
                    </div>
                    <div class="header-boards">
                        <a class="navbar-item" href="/#/project/1">
                               Boards
                            </a>
                    </div>
                </div>     
        `;
    return view;
  },
  after_render: async () => {},
};

export default Navbar;
