import { CCTypes } from "./CCTypes";


export interface CreditCardDTOs{
  name:string;
  //length:number;
  cardNumber?:string;
  expirationYear?:string;
  expirationMonth?:string;
 // image:string;
  cvc:string;
 // pattern: RegExp | null;
}
// export const CreditCardData: Record<CCTypes, CreditCardDTOs> =
// {
//   amex: {
//     name: 'American Express',
//     length: 15,
//     image: '/assets/cc-image/amex.png',
//     cvc: "4",
//     //pattern: /^3[47]/,
//   },
//   discover: {
//     name: "Discover Card",
//     length: 16,
//     image: '/assets/cc-image/discover.png',
//     cvc: "3",
//    // pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
//   },
//   mastercard: {
//     name: 'Master Card',
//     length: 16,
//     image: '/assets/cc-image/mastercard.png',
//     cvc: "3",
//     //pattern: /^5[1-5]/
//   },
//   visa: {
//     name: 'Visa',
//     length: 16,
//     image: '/assets/cc-image/visa.png',
//     cvc: "3",
//     //pattern: /^4/,
//   },
//   unknown: {
//     name: '',
//     length: 0,
//     image: '/assets/cc-image/unknown.png',
//     cvc: "0",
//     //pattern: null,
//   }
// };