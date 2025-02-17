export interface ItemDTO {
  id: number
  itemId: string
  pluName: string
  pluCode: string
  category: string
  subCategory: string
  measurement: string
  size: any
  weight: number
  description: string
  hsnCode: any
  createdBy: string
  createdOn: string
  lastUpdatedBy: string
  lastUpdatedOn: string
  purchaseprice: string
  wastage: string
  profitMargin: string
  sellingPrice: any
  marketPrice: string
  title: string
  imagePath: string
  profitPrice: string
  actualCost: string
  seasonSale: string
  itemGroup: any
  mgfCode: any
  gstPer: any
  sgstPer: any
  cgstPer: any
  manufracture: any
  offerType: any
  foodSegment: string
  totalViews: number
  totalFavs: number
  sellingVarience: string
  itemSellingType: string
  supplier: string
  featured: string
  promoVideoLink: string
  longDescription: string
  mainCategory: string
  featuredStartDate: string
  approval: string
  offerId: string
  stockType: string
  netWeight: number
  totalStock: string
  maxQuantityAllowed: number
  brand: string
  tag: string
  itemType: string
  visibility: number
  coupenDisc: number
  relation: number
  relationValue: string
  parentItemId: any
  taxValue: number
  isTaxFree: any
  kotPrint: number
  kotPrintDesc: any
  checkSpecail: any
  foodType: any
  foodSubType: any
  spicyLevel: number
  availableDay: number
  mealTimeType: string
  startTime: string
  preparationTime: string
  isSpecialDay: string
  endTime: string
  itemMeasuredIn: any
  vatPer: any
  hub: any
  isWishlisted: any
  wishlistId: number
  priceId: any
  isInCart: any,
  stockQty:any;
  offers:any[]
}
