import { CerealizaFrontendPage } from './app.po';

describe('cerealiza-frontend App', () => {
  let page: CerealizaFrontendPage;

  beforeEach(() => {
    page = new CerealizaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
