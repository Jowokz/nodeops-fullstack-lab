import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('NodeOps UI ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="container"><h2>Something went wrong in the UI.</h2></div>;
    }
    return this.props.children;
  }
}
