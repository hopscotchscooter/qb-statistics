import { NflApiElectronPage } from './app.po';

describe('nfl-api-electron App', function() {
  let page: NflApiElectronPage;

  beforeEach(() => {
    page = new NflApiElectronPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
