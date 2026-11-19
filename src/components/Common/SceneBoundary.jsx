"use client";
import { Component } from "react";

/**
 * Keeps a decorative 3D scene from taking the page down with it: if the scene throws (a texture
 * that fails to load, a lost WebGL context), it renders nothing and the page carries on.
 */
export default class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.warn("3D scene skipped:", error?.message || error); }
  render() { return this.state.failed ? null : this.props.children; }
}
