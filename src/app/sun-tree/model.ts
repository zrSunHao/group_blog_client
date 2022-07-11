import { TreeNode } from "./tree.service";

export const TREENODES: TreeNode[] = [
    {
        id: '1', name: 'node-1', parentId: '', open: false, data: null, children: [
            { id: '1-1', name: 'node-1-1', parentId: '1', open: false, data: null, children: [] },
            {
                id: '1-2', name: 'node-1-2', parentId: '1', open: false, data: null, children: [
                    {
                        id: '1-2-1', name: 'node-1-2-1', parentId: '1-2', open: false, data: null, children: [
                            { id: '1-2-1-1', name: 'node-1-2-1-1', parentId: '1-2-1', open: false, data: null, children: [] },
                            { id: '1-2-1-2', name: 'node-1-2-1-2', parentId: '1-2-1', open: false, data: null, children: [] },
                            { id: '1-2-1-3', name: 'node-1-2-1-3', parentId: '1-2-1', open: false, data: null, children: [] },
                        ]
                    },
                    { id: '1-2-2', name: 'node-1-2-2', parentId: '1-2', open: false, data: null, children: [] },
                    { id: '1-2-3', name: 'node-1-2-3', parentId: '1-2', open: false, data: null, children: [] },
                ]
            },
            { id: '1-3', name: 'node-1-3', parentId: '1', open: false, data: null, children: [] },
            { id: '1-4', name: 'node-1-4', parentId: '1', open: false, data: null, children: [] },
            { id: '1-5', name: 'node-1-5', parentId: '1', open: false, data: null, children: [] },
            { id: '1-6', name: 'node-1-6', parentId: '1', open: false, data: null, children: [] },
            {
                id: '1-7', name: 'node-1-7', parentId: '1', open: false, data: null, children: [
                    { id: '1-7-1', name: 'node-1-7-1', parentId: '1-7', open: false, data: null, children: [] },
                    { id: '1-7-2', name: 'node-1-7-2', parentId: '1-7', open: false, data: null, children: [] },
                    { id: '1-7-3', name: 'node-1-7-3', parentId: '1-7', open: false, data: null, children: [] },
                ]
            },
            { id: '1-8', name: 'node-1-8', parentId: '1', open: false, data: null, children: [] },
        ]
    },
    {
        id: '2', name: 'node-2', parentId: '', open: false, data: null, children: [
            { id: '2-1', name: 'node-2-1', parentId: '2', open: false, data: null, children: [] },
            { id: '2-2', name: 'node-2-2', parentId: '2', open: false, data: null, children: [] },
            { id: '2-3', name: 'node-2-3', parentId: '2', open: false, data: null, children: [] },
            { id: '2-4', name: 'node-2-4', parentId: '2', open: false, data: null, children: [] },
        ]
    },
    {
        id: '3', name: 'node-3', parentId: '', open: false, data: null, children: [
            { id: '3-1', name: 'node-3-1', parentId: '3', open: false, data: null, children: [] },
            { id: '3-2', name: 'node-3-2', parentId: '3', open: false, data: null, children: [] },
            { id: '3-3', name: 'node-3-3', parentId: '3', open: false, data: null, children: [] },
            { id: '3-4', name: 'node-3-4', parentId: '3', open: false, data: null, children: [] },
            { id: '3-5', name: 'node-3-5', parentId: '3', open: false, data: null, children: [] },
        ]
    },
    {
        id: '4', name: 'node-4', parentId: '', open: false, data: null, children: [
            { id: '4-1', name: 'node-4-1', parentId: '4', open: false, data: null, children: [] },
            { id: '4-2', name: 'node-4-2', parentId: '4', open: false, data: null, children: [] },
            { id: '4-8', name: 'node-4-8', parentId: '4', open: false, data: null, children: [] },
        ]
    },
    {
        id: '5', name: 'node-5', parentId: '', open: false, data: null, children: [
            { id: '5-1', name: 'node-5-1', parentId: '5', open: false, data: null, children: [] },
            { id: '5-2', name: 'node-5-2', parentId: '5', open: false, data: null, children: [] },
            { id: '5-3', name: 'node-5-3', parentId: '5', open: false, data: null, children: [] },
            { id: '5-4', name: 'node-5-4', parentId: '5', open: false, data: null, children: [] },
            { id: '5-5', name: 'node-5-5', parentId: '5', open: false, data: null, children: [] },
            { id: '5-6', name: 'node-5-6', parentId: '5', open: false, data: null, children: [] },
            { id: '5-7', name: 'node-5-7', parentId: '5', open: false, data: null, children: [] },
            { id: '5-8', name: 'node-5-8', parentId: '5', open: false, data: null, children: [] },
        ]
    },
    { id: '6', name: 'node-6', parentId: '', open: false, data: null, children: [] },
    {
        id: '7', name: 'node-7', parentId: '', open: false, data: null, children: [
            { id: '2-1', name: 'node-2-1', parentId: '7', open: false, data: null, children: [] },
        ]
    },
    { id: '8', name: 'node-8', parentId: '', open: false, data: null, children: [] },
    {
        id: '9', name: 'node-9', parentId: '', open: false, data: null, children: [
            { id: '9-1', name: 'node-9-1', parentId: '9', open: false, data: null, children: [] },
            { id: '9-2', name: 'node-9-2', parentId: '9', open: false, data: null, children: [] },
            { id: '9-3', name: 'node-9-3', parentId: '9', open: false, data: null, children: [] },
            { id: '9-4', name: 'node-9-4', parentId: '9', open: false, data: null, children: [] },
            { id: '9-5', name: 'node-9-5', parentId: '9', open: false, data: null, children: [] },
        ]
    },
];