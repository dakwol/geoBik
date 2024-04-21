export const API_LANDPLOAT_MODEL = {
    entity: 'geo/landplots/construction-control-list/',
    url: 'geo/landplots/',
    methods: {
        getConstruction:{
            url: 'construction-control-list/'
        },
        getConstructionById:{
            url: 'construction-control/'
        },
        createInspection: {
            url: '/create_inspection/'
        },
        uploadImage: {
            url: 'upload/'
        },
    },
}