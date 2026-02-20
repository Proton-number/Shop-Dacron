import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          {title: 'Accessories', value: 'accessories'},
          {title: 'Books and Home Decor', value: 'books-and-home-decor'},
          {title: 'Bottom Wear', value: 'bottom-wear'},
          {title: 'Footwear', value: 'foot-wear'},
          {title: 'Gadgets', value: 'gadgets'},
          {title: 'Head Wear', value: 'head-wear'},
          {title: 'Personal Care Essentials', value: 'personal-care-essentials'},
          {title: 'Sports and Games', value: 'sports-and-games'},
          {title: 'Top Wear', value: 'top-wear'},
          {title: 'Underwear', value: 'under-wear'},
          {title: 'Shop All', value: 'shop-all'},
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
})
