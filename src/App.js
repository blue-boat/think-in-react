
import React from 'react';

import './App.css'

class SearchBar extends React.Component {
  constructor (props) {
    super(props)
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleSearchTextChange (evt) {
    this.props.onSearchTextChange(evt.target.value)
  }

  handleInStockChange (evt) {
    this.props.onInStockChange(evt.target.value)
  }

  render () {
    const { searchText, onlyInStock } = this.props

    return (
      <div>
        <input type="text" placeholder="Search..." value={searchText} onChange={this.handleSearchTextChange} />
        <p>
          <input type="checkbox" id="onlyInStock" value={onlyInStock} onChange={this.handleInStockChange} />
          <label htmlFor="onlyInStock">Only show items in stock</label>
        </p>
      </div>
    )
  }
}

class ProductTableCategory extends React.Component {
  render () {
    const category = this.props.category
    return (
      <tr colSpan={2}>
        <th>{category}</th>
      </tr>
    )
  }
}

class ProductTableItem extends React.Component {
  render () {
    const product = this.props.product;
    const name = product.stocked
      ? product.name
      : <span style={{color: 'red'}}>
          {product.name}
        </span>
    return (
      <tr>
        <td>{name}</td><td>{product.price}</td>
      </tr>
    )
  }
}

class ProductTable extends React.Component {
  render () {
    const { products, onlyInStock, searchText } = this.props

    let newProductCategory = null
    const tableRows = []

    products.forEach(product => {
      // if new product category, render category name then items
      if (onlyInStock && !product.stocked) {
        return 
      }
      if (product.name.indexOf(searchText) === -1) {
        return
      }
      if (product.category !== newProductCategory) {
        tableRows.push(
          <ProductTableCategory key={product.category} category={product.category} />
        )
      }
      tableRows.push(
        <ProductTableItem key={product.name} product={product} />
      )
      newProductCategory = product.category
    })

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    )
  }
}


class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      searchText: '',
      onlyInStock: false
    }

    this.updateSearchText = this.updateSearchText.bind(this)
    this.updateInStock = this.updateInStock.bind(this)
  }

  updateSearchText (newValue) {
    this.setState({ searchText: newValue })
    console.log('updating search text')
  }

  updateInStock (newValue) {
    this.setState({ onlyInStock: newValue })
    console.log('updating in stock')
  }

  render () {
    const products = this.props.products
    const { searchText, onlyInStock } = this.state

    return (
      <div>
        <SearchBar
          searchText={searchText}
          onSearchTextChange={this.updateSearchText}
          onlyInStock={onlyInStock}
          onInStockChange={this.updateInStock}
        />
        <ProductTable
          searchText={searchText}
          onlyInStock={onlyInStock}
          products={products}
        />
      </div>
    )
  }
}


function App() {

  const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

  return (
    <FilterableProductTable products={PRODUCTS} />
  );
}

export default App;
