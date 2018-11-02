import React from "react";

class Progress extends React.Component {
  constructor(props) {
    super(props);

    const { radius = 20, stroke = 3 } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const {
      radius = 20,
      stroke = 3,
      progress,
      color = "white",
      fill = "#eee"
    } = this.props;
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={color}
          fill={fill}
          strokeWidth={stroke}
          strokeDasharray={this.circumference + " " + this.circumference}
          style={{ strokeDashoffset }}
          stroke-width={stroke}
          r={this.normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    );
  }
}

export default Progress;
