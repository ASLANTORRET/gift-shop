import _ from 'lodash'

const Resolver = {
  OasisProduct: {
  },
  OasisStock: {
    warehouse(root, args, context) {
      const warehouses = {
        '000000029': 'Россия',
        '1-0000052': 'Европа'
      }
      return warehouses[root.warehouse_id]
    }
  }

}

export default Resolver