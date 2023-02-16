import Validations from "../src/Validations";

describe("공통 Validations 단위 테스트", () => {
  test("입력값이 숫자인지 판별하는 함수 테스트", () => {
    const input = "aiden";

    expect(Validations.isNumber(input)).toBeFalsy();
  });

  test("입력값이 양의 정수인지 판별하는 함수 테스트(음수)", () => {
    const input = -2000;

    expect(Validations.isPositiveInteger(input)).toBeFalsy();
  });

  test("입력값이 양의 정수인지 판별하는 함수 테스트(소수)", () => {
    const input = 1.3;

    expect(Validations.isPositiveInteger(input)).toBeFalsy();
  });
});

describe("구매금액 Validations 단위 테스트", () => {
  test("구입금액이 1000으로 나누어 떨어지는지 판별하는 함수 테스트", () => {
    const buyMoney = 200;

    expect(Validations.isDevidedByThousand(buyMoney)).toBeFalsy();
  });
});

describe("당첨번호와 보너스번호 Validations 단위 테스트", () => {
  test("당첨번호와 보너스번호가 1~45의 범위인지 판별하는 함수 테스트", () => {
    const input = 0;

    expect(Validations.isCorrectRange(input)).toBeFalsy();
  });

  test("당첨로또의 길이를 판별하는 함수 테스트", () => {
    const lottoNumbers = ["1","2","3"]

    expect(Validations.isCorrectLength(lottoNumbers)).toBeFalsy();
  });
});

describe("보너스 번호 Validations 단위 테스트", () => {
  test("보너스 번호가 중복된 숫자인지 판별하는 함수 테스트", () => {
    const winningLotto = ['1','2','3','4','5','6'];
    const bonusNumber = 1;
    expect(Validations.hasBonusNumber(bonusNumber, winningLotto)).toBeTruthy();
  });
});

describe("재시작 입력 Validations 단위 테스트", () => {
  test("재시작 여부 입력이 y/n이 아닌지 판별하는 함수 테스트", () => {
    const retryInput = "A"
    expect(Validations.isCorrectRetryInput(retryInput)).toBeFalsy();
  });
});

describe("랜덤생성 된 로또의 중복 Validations 테스트", () => {
  test("랜덤생성 된 로또에 중복 된 숫자가 있으면 false를 반환", () => {
    const randomNumbers = ["1","1","2","3","4","5"]
    expect(Validations.isDuplicatedNumbers(randomNumbers)).toBeFalsy();
  });
});

