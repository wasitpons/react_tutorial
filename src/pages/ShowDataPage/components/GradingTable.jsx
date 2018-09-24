import React, { Component } from 'react';
import { map, filter } from 'lodash';
import { Col, Row } from 'reactstrap';
import './GradingTable.css';

const scoreChecking = [ 
  { grade: 'A', minScore: 80, maxScore: 100 },
  { grade: 'B', minScore: 70, maxScore: 79 },
  { grade: 'C', minScore: 60, maxScore: 69 },
  { grade: 'D', minScore: 50, maxScore: 59 },
  { grade: 'F', minScore: 0, maxScore: 49 },
];

class GradingTable extends Component {

  mapWithStudent = () => (
    map(scoreChecking, score => {
      let data = {};
      data.grade = score.grade;
      data.count = filter(this.props.studentData, 
        student => 
        student.score > score.minScore && student.score <= score.maxScore
      ).length;
      return data;
    })
  )

  render() {
    const filteredData = this.mapWithStudent();
    /*
      [ 
        { grade: 'A', count: 10},
        { grade: 'B', count: 6}
      ]
    */
    return (
      <div>
        <Row>
          { map(filteredData, data => (
            <Col md={{ size: 4}} key={data.grade}>
              <Col md={{ size: 6 }} style={{display: 'inline-block'}}>
                <div className="icon">
                  {data.grade}
                </div>
              </Col>
              <Col md={{ size: 6 }} style={{display: 'inline-block', fontSize: 36}}>
                {data.count}
              </Col>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
} 



export default GradingTable;