export const convertDoller = (value) => {
  return 'US$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}