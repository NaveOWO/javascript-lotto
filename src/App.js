import LOTTO_GAME from "./constants/Lotto.js"
import VIEW from "./constants/View.js";
import Console from "./util/Console.js";
import InputView from "./view/InputView.js";
import Lotto from "./domain/Lotto.js";
import Lottos from "./domain/Lottos.js";
import Random from "./util/Random.js";
import OutputView from "./view/OutputView.js";
import LottoScore from "./domain/LottoScore.js";
import InputCheck from "./InputCheck.js";
import Utils from "./util/Utils.js";

class App {
  async play() {
    const buyMoney = await this.getBuyMoney();
    const lottos = await this.createLotto(parseInt(buyMoney / Constants.LOTTO_PRICE));
    OutputView.printBuyLottos(lottos.lottos);
    const winningLotto = await this.getWinningLotto();
    const bonusNumber = await this.getBonusNumber(winningLotto);
    this.compareLottos(lottos, winningLotto, bonusNumber);
    const retryInput = await this.getRetryInput();
    this.retryLottoGame(retryInput, lottos);
  }

  async getBuyMoney() {
    const buyMoney = await InputView.inputMoney(VIEW.INPUT_MONEY);
    try {
      InputCheck.validateBuyMoney(buyMoney);
    } catch (e) {
      Console.print(e);
      return await this.getBuyMoney();
    }
    return Number(buyMoney);
  }

  async createLotto(lottoAmount) {
    const lottos = Array.from(
      { length: lottoAmount },
      () => new Lotto(Random.generateRandomNumbers())
    );
    return new Lottos(lottos);
  }

  async getWinningLotto() {
    const winningNumbers = await InputView.inputWinningNumbers(
      VIEW.INPUT_WINNING_LOTTO
    );
    const winningLotto = Utils.convertStringToNumber(winningNumbers.split(","));
    try {
      InputCheck.validateWinningNumbers(winningLotto);
    } catch (e) {
      Console.print(e);
      return await this.getWinningLotto();
    }
    return winningLotto;
  }

  async getBonusNumber(winningLotto) {
    const bonusInput = await InputView.inputBonusNumber(
      VIEW.INPUT_BONUS_NUMBER
    );
    const bonusNumber = Number(bonusInput);
    try {
      InputCheck.validateBonusNumber(bonusNumber, winningLotto);
      InputCheck.checkNumber(bonusNumber);
    } catch (e) {
      Console.print(e);
      return await this.getBonusNumber();
    }
    return bonusNumber;
  }

  compareLottos(lottos, winningLotto, bonusNumber) {
    lottos.compareLottosWithWinningLotto(winningLotto, bonusNumber);
    const lottoScore = new LottoScore(lottos.lottos);
    lottoScore.compareLottosScore(lottos.lottos);
    OutputView.printResult(lottos.lottos.length, lottoScore);
  }

  async getRetryInput() {
    const retryInput = await InputView.inputRetry(VIEW.INPUT_RETYR);
    try {
      InputCheck.validateRetryInput(retryInput);
    } catch (e) {
      Console.print(e);
      return await this.getRetryInput();
    }
    return retryInput
  }

  async retryLottoGame(retryInput, lottos) {
    if (retryInput === LOTTO_GAME.RETRY_DOWNER) {
      lottos.resetLottos();
      await this.play();
    }
    if (retryInput === LOTTO_GAME.QUIT_DOWNER) {
      Console.close();
    }
  }
}

export default App;
