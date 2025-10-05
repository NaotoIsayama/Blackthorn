//Lucide
import { Zap } from "lucide-react";

export default {
    name: 'repeatFlash',
    title: 'Repeat Flash',
    type: 'document',
    icon: Zap,
    fields: [

        // FLASH NAME
        {
            name: 'flashName',
            title: 'Flash Name',
            type: 'string',
            validation: Rule =>
                Rule.required()
            
            /* ADD IN CUSTOM VALIDATION LOGIC LATER TO CHECK FOR DUPLICATES.custom(async (value, context) => {
                    if (!value) return true
                    const {document, get}
                })*/
        },

        // FLASH DESCRIPTION
        {
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: Rule =>
                Rule.required()
        },

        // FLASH category
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            validation: Rule =>
                Rule.required()
        },

        // FLASH MINSIZE
        {
            name: 'minSize',
            title: 'Minimum Size (inches)',
            type: 'number',
            validation: Rule =>
                Rule.required()
        },

        // FLASH PRICE
        {
            name: 'price',
            title: 'Price (CAD)',
            type: 'number',
            validation: Rule =>
                Rule.required()
        },

        //FLASH PLACEMENT AREAS
        {
            name: 'placementAreas',
            title: 'Placement Areas for this Flash',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                layout: 'tags',
            },
            validation: Rule =>
                Rule.required()
        },

        //FLASH IMAGE
        {
            name: 'flashImage',
            title: 'Flash Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: Rule =>
                Rule.required()
        },
    ],
}