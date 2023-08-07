import React from "react"
import { NumericFormat } from "react-number-format"
import { useDispatch, useSelector } from "react-redux"
import { decreaseInventoryByPid } from "../stores/features/product/productSlice"
import { addItemByProduct } from "../stores/features/cart/cartSlice"

const CommerceProduct = () => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)

  return (
    <div className="commerce-products">
      <h3>Products</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="col-price">Price</th>
            <th className="col-inventory">Inventory</th>
            <th className="col-addtocart"></th>
          </tr>
        </thead>

        <tbody>
        {product.products.map((product, index) => {
          return (
            <tr key={index}>
              <td>
                { product.title }
              </td>
              <td className="col-price">
                <NumericFormat value={ product.price } displayType={'text'} prefix={'$'} thousandSeparator={true} decimalScale={'2'} />
              </td>
              <td className="col-inventory">
                { product.inventory }
              </td>
              <td className="col-addtocart">
                <button
                  disabled={product.inventory <= 0}
                  onClick={() => {
                    dispatch(addItemByProduct(product))
                    dispatch(decreaseInventoryByPid({ pid: product.pid }))
                  }}
                >
                  Add to cart
                </button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default CommerceProduct