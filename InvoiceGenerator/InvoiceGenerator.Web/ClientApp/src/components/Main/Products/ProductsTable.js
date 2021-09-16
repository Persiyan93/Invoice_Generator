import React, { useState} from 'react'
import SearchBar from '../../Elements/SearchBar';
import ProductTableNavigationMenu from './ProductTableNavigationMenu';
import ArticlesTable from './Articles/ArticlesTable';
import OfferedServicesTable from './Services/OfferedServicesTable'

export default function ProductsTable(props) {
   
    const [isArticleSelected, selectArticle] = useState(true)
    const [filterString, setFilterString] = useState();
    const [articleFilterFunction, setArticleFilterFunc] = useState({ fn: (elements) => { return elements } })
    const [serviceFilterFunction, setServiceFilterFunc] = useState({ fn: (elements) => { return elements } })



    function searchHandler(event) {
        let target = event.target;
        setFilterString(target.value)

        if (isArticleSelected) {
            setArticleFilterFunc({
                fn: elements => {
                    if (target.value == '') {
                        return elements;
                    }
                    else {
                        return elements.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            })
        }
        else {
            setServiceFilterFunc({
                fn: elements => {
                    if (target.value == '') {
                        return elements;
                    }
                    else {
                        return elements.filter(x => x.name.toLowerCase().includes(target.value.toLowerCase()))
                    }
                }
            })
        }
    }



     return (
        <>

            <SearchBar
                title='Продукти'
                searchbarLabel='Намери продукт'
                placeholder='Име или номер на продукт'
                filterString={filterString}
                searchHandler={searchHandler}
            />
            <ProductTableNavigationMenu
                isArticleSelected={isArticleSelected}
                selectArticle={selectArticle}
            />

            {isArticleSelected ?
                (

                    <ArticlesTable
                        filterFunction={articleFilterFunction}

                    />

                )
                :
                (
                    <OfferedServicesTable
                        filterFunction={serviceFilterFunction} />
                )

            }

         </>
    )
}

