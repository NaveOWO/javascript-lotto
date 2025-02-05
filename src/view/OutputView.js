import VIEW from "../constants/View";
import LOTTO_SCORE from "../constants/LottoBoard";
import Console from "../util/Console";

const OutputView = {
  printLottoAmount(lottoAmount) {
    Console.print(`${lottoAmount}${VIEW.PRINT_LOTTO_AMOUNT}`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      Console.print(lotto.lottoNumbers);
    });
  },

  printResultMessage() {
    Console.print(VIEW.PRINT_RESULT_TITLE);
    Console.print(VIEW.DEVISION_BAR.repeat(20));
  },

  printLottoResults(lottoRanking) {
    for (const score in lottoRanking) {
      Console.print(
        `${score} (${LOTTO_SCORE.moneyBoard[score]}원) - ${lottoRanking[score]}개`
      );
    }
  },

  printTotalBenefit(lottos) {
    Console.print(
      `${VIEW.PRINT_BENEFIT_RATE_START} ${lottos}${VIEW.PRINT_BENEFIT_RATE_END}`
    );
  },

  printBuyLottos(lottos) {
    this.printLottoAmount(lottos.length);
    this.printLottos(lottos);
  },

  printResult(lottoAmount, lottoScore) {
    this.printResultMessage();
    this.printLottoResults(lottoScore.lottoRanking);
    this.printTotalBenefit(lottoScore.getLottoBenefitRate(lottoAmount));
  },
};

export default OutputView;
