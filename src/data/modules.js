const modules = [
  {
    alias: 'Product',
    icon: 'build',
    children: [
      {
        alias: 'Product',
        slug: 'product'
      },
      {
        alias: 'Brand',
        slug: 'brand'
      },
      {
        alias: 'Category',
        slug: 'category'
      },
      {
        alias: 'Attribute',
        slug: 'attribute'
      },
      {
        alias: 'Unit',
        slug: 'unit'
      }
    ]
  }
]

export default modules
