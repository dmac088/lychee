import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { instance as axios } from "../../../components/Layout/Helpers/api";
import * as bagService from "../../../services/Bag/index";
import { findByCode, findRootNode } from '../../../services/Category';
import ProductGrid from './Product/Grid/ProductGrid';
import ProductList from './Product/List/ProductList';
import Sidebar from './Sidebars/Sidebar';
import ShopBanner from './ShopBanner';
import ShopHeader from './ShopHeader';
import Pagination from './Pagination';
import { Spinner } from '../../Layout/Helpers/animation';
import { usePrevious } from '../Helpers/general';
import { ListSidebar } from './Sidebars/Layout/ListSidebar';
import { RangeSidebar } from './Sidebars/Layout/RangeSidebar';


function Products(props) {
    const { toggleQuickView, match } = props;

    const discovery = useSelector(state => state.discovery);

    const query = queryString.parse(props.location.search);
    const { page, size, sort, q } = query;

    const [stateObject, setObjectState] = useState({
        gridLayout: true,
        products: [],
        page: {},
        category: null,
        selectedFacets: [],
        facets: [],
        loading: true,
    });

    const addToBag = (e) => {
        e.preventDefault();
        bagService.addToBag(e.target.id);
    }

    const { categoryCode, type } = match.params;
    const categories = useSelector(state => state.categories);


    //capture previous states
    const prevCategoryCode = usePrevious(categoryCode);

    const addFacet = (facet) => {
        setObjectState((prevState) => ({
            ...prevState,
            selectedFacets: [...stateObject.selectedFacets, facet],
            loading: true,
        }));
    }

    const replaceFacet = (facet) => {
        setObjectState((prevState) => ({
            ...prevState,
            selectedFacets: [...stateObject.selectedFacets.filter(f => f.data.facetingName !== facet.data.facetingName), facet],
            loading: true,
        }));
    }

    const removeFacet = (facet) => {
        setObjectState((prevState) => ({
            ...prevState,
            selectedFacets: stateObject.selectedFacets.filter(f => f.data.id !== facet.data.id),
            loading: true,
        }));
    }

    useEffect(() => {
        if (categoryCode !== prevCategoryCode) {
            setObjectState((prevState) => ({
                ...prevState,
                selectedFacets: [],
                loading: true,
            }));
        }
    }, [categoryCode]);

    useEffect(() => {
        let isSubscribed = true;

        //categories is the application root, if it refreshes everything else refreshes
        if (!categories.loading) {

            const currentCategory = findByCode(categoryCode);
            const rootNode = findRootNode(categories.list);

            axios.post(
                (type === 'browse')
                    ? currentCategory._links.products.href
                    : discovery.links.searchProduct.href.replace('{category}', rootNode.data.id).replace('{q}', query.q),
                stateObject.selectedFacets.map(f => f.data))
                .then((response) => {
                    if (isSubscribed) {
                        setObjectState((prevState) => ({
                            ...prevState,
                            page: response.data.searchResults.page,
                            products: (response.data.searchResults._embedded)
                                ? response.data.searchResults._embedded.products
                                : [],
                            facets: response.data.searchFacets || [],
                            category: currentCategory,
                            loading: false,
                        }));
                    }
                });
        }
        return () => (isSubscribed = false);
    }, [categories.loading,
        stateObject.loading,
        page,
        size,
        sort,
        q]);

    const renderProducts = (products) => {
        return products.map((p, index) => {
            return (stateObject.gridLayout)
                ? <ProductGrid
                    {...props}
                    addToBag={addToBag}
                    key={index}
                    product={p}
                    toggleQuickView={toggleQuickView} />
                : <ProductList
                    {...props}
                    addToBag={addToBag}
                    key={index}
                    product={p}
                    toggleQuickView={toggleQuickView} />
        })
    }

    const changeLayout = (e) => {
        e.preventDefault();
        if (!e.target) { return; }
        const id = e.target.id;
        setObjectState((prevState) => ({
            ...prevState,
            gridLayout: id === 'grid',
        }));
    }

    

    const componentSelector = (type) => {

        const priceFacet = stateObject.selectedFacets.filter(f => f.data.facetingName === 'price');

        return (type === 'browse')
            ? <RangeSidebar
                heading={"Price Range"}
                modFacet={replaceFacet}
                currentPrice={(priceFacet[0]) ? priceFacet[0].data.value : null} />
            : <ListSidebar
                heading={"Price Range"}
                modFacet={addFacet} />
    }

    return (
        (stateObject.loading)
            ? <Spinner />
            :
            <div className="shop-page-container mb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 order-2 order-lg-1">
                            <div className="sidebar-area">
                                <ListSidebar
                                    heading={"Selection"}
                                    items={stateObject.selectedFacets}
                                    modFacet={removeFacet} />
                                <Sidebar
                                    link={stateObject.category._links.children.href}
                                    type={type}
                                    facets={stateObject.facets.filter(f => f.data.facetingName === 'category')}
                                    selectedFacets={stateObject.selectedFacets}
                                    loading={stateObject.loading}>
                                    <ListSidebar
                                        heading={"Categories"}
                                        modFacet={addFacet} />
                                </Sidebar>
                                <Sidebar
                                    link={stateObject.category._links.brands.href}
                                    type={type}
                                    facets={stateObject.facets.filter(f => f.data.facetingName === 'brand')}
                                    selectedFacets={stateObject.selectedFacets}
                                    loading={stateObject.loading}>
                                    <ListSidebar
                                        heading={"Brands"}
                                        modFacet={addFacet} />
                                </Sidebar>
                                <Sidebar
                                    {...props}
                                    link={stateObject.category._links.maxprice.href}
                                    type={type}
                                    facets={stateObject.facets.filter(f => f.data.facetingName === 'price')}
                                    selectedFacets={stateObject.selectedFacets}
                                    addFacet={addFacet}
                                    loading={stateObject.loading}>
                                    {componentSelector(type)}
                                </Sidebar>
                                <Sidebar
                                    link={stateObject.category._links.tags.href}
                                    type={type}
                                    facets={stateObject.facets.filter(f => f.data.facetingName === 'tag')}
                                    selectedFacets={stateObject.selectedFacets}
                                    loading={stateObject.loading}>
                                    <ListSidebar
                                        heading={"Tags"}
                                        modFacet={addFacet} />
                                </Sidebar>
                            </div>
                        </div>
                        <div className="col-lg-9 order-1 order-lg-2 mb-sm-35 mb-xs-35">
                            {(stateObject.loading || categories.loading)
                                ? <Spinner />
                                : <React.Fragment>
                                    <ShopBanner />
                                    <ShopHeader
                                        {...props}
                                        page={stateObject.page}
                                        changeGrid={changeLayout}
                                        type={type} />
                                    <div className=
                                        {(stateObject.gridLayout)
                                            ? "shop-product-wrap grid row no-gutters mb-35"
                                            : "shop-product-wrap row no-gutters mb-35 list"}>
                                        {renderProducts(stateObject.products)}
                                    </div>
                                    <Pagination
                                        {...props}
                                        page={stateObject.page} />
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Products;