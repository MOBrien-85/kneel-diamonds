import { getOrders, getMetals, getSizes, getStyles } from "./database.js"

const buildOrderListItem = (order) => {
    const metals = getMetals()
    // Remember that the function you pass to find() must return true/false
    const foundMetal = metals.find(
        // i added order as a parameter because the debugger couldn't read 'order.metalId'
        (metal) => {
            return metal.id === order.metalId
        }
    )
    //code that will find the price of each size.
    const sizes = getSizes()

    // use find() to return a true/false for size.id and order.sizeId
    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )

    // code that will find the prize of each style.
    const styles = getStyles()

    // use find() to return true/false for style
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )
    // once i've written code that determines prices for size and style, add those values to the code below
    let metalCost = foundMetal.price
    let sizeCost = foundSize.price
    let styleCost = foundStyle.price

    const totalCost = metalCost + sizeCost + styleCost

    // code below will interpolate the price of the metal within the HTML string
    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
    Order #${order.id} cost ${costString}
</li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}



