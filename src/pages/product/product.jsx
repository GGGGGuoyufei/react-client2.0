import React, { Component } from 'react'
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message
} from 'antd'
import {reqShopsList,reqSearchProducts} from '../../api/index'
const Option = Select.Option
/**
 * 商品管理
 */
export default class Product extends Component {
  state = {
    loading: false,
    products: [], // 商品列表
    total:0,//商品的总数量
    searchType: 'productName', // 默认是按商品名称搜索
    searchName: '', // 搜索的关键字
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name'
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        width: 100,
        dataIndex: 'price',
        render: (price) => '¥' + price
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: ({_id, status}) => {
          let btnText = '下架'
          let text = '在售'
          if (status === 2) {
            btnText = '上架'
            text = '已下架'
          }
          return (
            <span>
              <button type="primary">{btnText}</button><br />
              <span>{text}</span>
            </span>
          )
        }
      },
      
      {
        title: '操作',
        width: 100,
        render: (product) => (
          <span>
            <Button type="primary">详情</Button>
            <Button type="error">修改</Button>
          </span>
        )
      },
    ]
  }
  //获取商品列表
  getProducts = async (pageNum) => {
    // 保存当前请求的页码
    this.pageNum = pageNum
    const { searchName, searchType } = this.state
    let result
    // 发请求获取数据
    if (!this.isSearch) {
      result = await reqShopsList(pageNum, 3)
    } else {
      result = await reqSearchProducts({ pageNum, pageSize: 3, searchName, searchType })
    }
    
    if (result.status === 0) {
      // 取出数据
      const { total, list } = result.data
      // 更新状态
      this.setState({
        products: list,
        total
      })
    }
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    // 获取第一页显示
    this.getProducts(1)
  }
  render() {
    const { loading, products,total,searchType, searchName} = this.state
    const title = (
      <span>
        <Select 
          style={{ width: 200 }} 
          value={searchType}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input 
          style={{ width: 200, margin: '0 10px' }} 
          placeholder="关键字" 
          value={searchName}
          onChange={event => this.setState({searchName: event.target.value})}
        />
        <Button type="primary"
          onClick={() => {
            this.isSearch = true  // 保存搜索的标记
            this.getProducts(1)
          } } 
        >搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered={true}
          rowKey="_id"
          loading={loading}
          columns={this.columns}
          dataSource={products}
          pagination={{
            total,
            defaultPageSize:3,
            showQuickJumper: true,
            onChange:this.getProducts
          }}
        />
      </Card>
    )
  }
}
