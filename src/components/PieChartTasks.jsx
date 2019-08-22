import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { Label, Divider } from 'semantic-ui-react'




export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const colors = ['#B03060', '#FE9A76', '#FFD700', '#32CD32', '#008080', '#0E6EB8', '#EE82EE', '#B413EC', '#FF1493', '#A0A0A0'];

    let extractNames = () =>{
        return this.props.data ?
        this.props.data.all_tasks : null
      }

      let users = this.props.data.users
      // users.find(user => array[i].user_id === user.id)
    
      let createObject = (array) =>{
        let new_array = []
        for(let i=0;i< array.length;i++){
          new_array.push({name: array[i].name, value: array[i].user_id})
        }
        return new_array
      }
    
      const data = createObject(extractNames())
    
    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';


    
      return (
        <g>
          <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 10}
            fill={fill}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text> */}
          {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
            {`(${(percent * 100).toFixed(2)}%)`}
          </text> */}
        </g>
      );
    };

    return (
      <>
      <Divider hidden/>
      <Label ribbon color="olive">Household statistics: Tasks</Label>
      <PieChart width={600} height={300}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={400}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        >
                  {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
          }
          </Pie>
      </PieChart>
      </>
    );
  }
}
