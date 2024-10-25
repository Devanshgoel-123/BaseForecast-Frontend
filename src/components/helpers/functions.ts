import { enqueueSnackbar } from "notistack";
export const getTimeBetween = (dateFuture: number, dateNow: number) => {
  var seconds = Math.floor((dateFuture - dateNow) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  return [days, hours, minutes];
};

export const handleToast = (
  heading: string,
  subHeading: string,
  type: string
) => {
  enqueueSnackbar(heading, {
    //@ts-ignore
    variant: "custom",
    subHeading: subHeading,
    type: type,
    persist: true,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};

export const calcPrice = (poolBalances: any[]): number[] => {
  console.log(poolBalances);
  const hasZeroBalances = poolBalances.every((h) => h.toString() === "0");
  if (hasZeroBalances) {
    return poolBalances.map(() => 0);
  }

  const product = poolBalances.reduce((a, b) => a * b);
  const denominator = poolBalances
    .map((h) => product / h)
    .reduce((a, b) => a + b);

  const prices = poolBalances.map((holding) => product / holding / denominator);
  return prices.map((price) => +price.valueOf());
};
