module.exports = [
    {
        label: 'Electron',
        submenu: [
            {label: 'item1'},
            {label: 'item2'}
        ]
    },
    {
        label: 'Actions',
        submenu: [
            {label: 'actino1'},
            {label: 'action2'},
            {
                label: 'Console action',
                click: ()=>{console.log('Greetings from electron :)')},
                accelerator: 'Shift + g'
            },
            {role: 'toggledevtools'},
            {role: 'togglefullscreen'}
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {role: 'copy'},
            {role: 'paste'}
        ]
    }
]