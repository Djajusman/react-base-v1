import React, { Component } from "react";
import ReactGA from "react-ga";

// init dengan mencantumkan Tracking ID
ReactGA.initialize('G-F9VS4W64W8');

const pageViewGa = (WrappedComponent, options = {}) => {
    const trackingPageView = page => {
        ReactGA.set({
            page,
            ...options
        })

        ReactGA.pageview(page)
    }
    function loadScript(src) {
        let script = document.createElement('script');
        script.src = src;
        script.async = false;
        document.body.append(script);
    }
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }

    return class extends Component {
        state = {
            page: null
        }

        static getDerivedStateFromProps(props, state) {
            const page = props.location.pathname + props.location.search
            if (page !== state.page) {
                return {
                    page
                }
            }

            return null
        }

        componentDidMount() {
            const page = this.props.location.pathname + this.props.location.search
            trackingPageView(page)
            loadScript("https://www.googletagmanager.com/gtag/js?id=G-F9VS4W64W8")
            gtag('js', new Date());
            gtag('config', 'G-F9VS4W64W8');
        }

        componentDidUpdate(prevProps) {
            const currentPage = prevProps.location.pathname + prevProps.location.search
            const nextPage = this.state.page

            if (currentPage !== nextPage) {
                trackingPageView(nextPage)
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }

    }
}

export default pageViewGa
