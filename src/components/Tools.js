/**
 * Created by zmk on 2017/7/27.
 */
export default function getRangeRandom(low,high){
  return Math.ceil(Math.random()*(high-low)+low);
}
