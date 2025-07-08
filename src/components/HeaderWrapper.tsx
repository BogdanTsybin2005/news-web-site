'use client'

import { Header } from './Header'

type Props = {
    categories: string[]
}

export default function HeaderWrapper({ categories }: Props) {
    return <Header categories={categories} />
}