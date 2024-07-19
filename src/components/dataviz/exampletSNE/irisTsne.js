import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { rowProcessor } from '../../../utils/irisUtils'

const tSNEJs = require('../../../utils/tsne')

function myDelayer(ms) {
  return new Promise(res => setTimeout(res, ms))
}

export default function IrisAnimated() {
  const [data, setData] = useState(null)
  const [colorScale, setColorScale] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tsne, setTsne] = useState(null)
  const [circleGroup, setCircleGroup] = useState(null)
  const [initialPerplexity, setInitialPerplexity] = useState(10)
  const [initialEpsilon, setInitialEpsilon] = useState(10)
  const slidersSettersMapping = {
    epsilon: setInitialEpsilon,
    perplexity: setInitialPerplexity
  }

  const svgRef = useRef(null)

  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const getDimensions = () => {
    const width = window.innerWidth * 0.65
    const height = window.innerHeight * 0.6
    const margins = { left: 70, right: 150, top: 50, bottom: 50 }
    const innerWidth = width - margins.left - margins.right
    const innerHeight = height - margins.top - margins.bottom

    return {
      width,
      height,
      margins,
      innerWidth,
      innerHeight
    }
  }

  const handleSliderChange = (param, value) => {
    const newTsne = tsne
    newTsne[param] = value
    setIsPlaying(false)
    setTsne(newTsne)
    slidersSettersMapping[param](value)
  }

  const computeScales = (data) => {
    const dimensions = getDimensions()
    const xExtent = d3.extent(data.map(d => d[0]))
    const yExtent = d3.extent(data.map(d => d[1]))

    const xScale = d3.scaleLinear().domain(xExtent).range([5, dimensions.innerWidth - 5])
    const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.innerHeight - 5, 5])

    return { xScale, yScale }
  }

  useEffect(() => {
    const dimensions = getDimensions()

    d3.csv('/static/data/Iris.csv', rowProcessor).then(data => {
      const dataTSNE = data.map(d => ({ id: d.Id, x: Math.random(), y: Math.random(), Species: d.Species }))

      const colorExtent = [...new Set(dataTSNE.map(d => d.Species))]
      const colorScale = d3.scaleOrdinal().domain(colorExtent).range(['red', 'steelblue', 'green'])

      const tsne = new tSNEJs.tSNE({
        epsilon: 10,
        perplexity: 10,
        dim: 2
      })
      tsne.initDataRaw(
        data.map(d => ([d.PetalLengthCm, d.PetalWidthCm, d.SepalLengthCm, d.SepalWidthCm]))
      )

      var circleGroup = d3.select(svgRef.current)
        .select('.iris-tsne-plot-container')
        .selectAll('.circle-tsne-group')
        .data(dataTSNE, d => d.id)

      // Exit 
      circleGroup.exit().remove()

      // Enter / update
      var circleGroupEnter = circleGroup.enter()
        .append('g')
        .attr('class', 'circle-tsne-group')

      circleGroup = circleGroup.merge(circleGroupEnter)

      circleGroupEnter.append('circle')
        .attr('class', 'circle-tsne-point')
        .attr('cx', dimensions.innerWidth / 2)
        .attr('cy', dimensions.innerHeight / 2)
        .attr('r', 0)

      const embeddings = tsne.getSolution()
      const { xScale, yScale } = computeScales(embeddings)

      circleGroup.select('.circle-tsne-point')
        .transition().duration(1000)
        .delay((d, i) => i * 10)
        .attr('cx', (d, i) => xScale(embeddings[i][0]))
        .attr('cy', (d, i) => yScale(embeddings[i][1]))
        .attr('r', 10)
        .attr('fill', d => colorScale(d.Species))
        .attr('fill-opacity', 0.8)

      setData(data)
      setColorScale(() => colorScale)
      setTsne(tsne)
      setCircleGroup(circleGroup)
    })
  }, [])

  useEffect(() => {
    drawCircles()
  }, [isPlaying, tsne, circleGroup, colorScale])

  

  const handlePlayClick = () => {
    setIsPlaying(prev => !prev)
  }

  const handleResetClick = () => {
    const newTsne = new tSNEJs.tSNE({
      epsilon: 10,
      perplexity: 10,
      dim: 2
    })
    newTsne.initDataRaw(data.map(d => ([d.PetalLengthCm, d.PetalWidthCm, d.SepalLengthCm, d.SepalWidthCm])))

    const embeddings = newTsne.getSolution()
    const { xScale, yScale } = computeScales(embeddings)

    circleGroup.select('.circle-tsne-point')
      .transition().duration(1000)
      .delay((d, i) => i * 10)
      .attr('cx', (d, i) => xScale(embeddings[i][0]))
      .attr('cy', (d, i) => yScale(embeddings[i][1]))
      .attr('r', 10)
      .attr('fill', d => colorScale(d.Species))
      .attr('fill-opacity', 0.8)

    setIsPlaying(false)
    setInitialPerplexity(10)
    setInitialEpsilon(10)
    setTsne(newTsne)
  }

  const drawCircles = async () => {
    while (isPlayingRef.current) {
      tsne.step()
      const embeddings = tsne.getSolution()
      const { xScale, yScale } = computeScales(embeddings)

      circleGroup.select('.circle-tsne-point')
        .transition().duration(1000)
        .delay((d, i) => i * 10)
        .attr('cx', (d, i) => xScale(embeddings[i][0]))
        .attr('cy', (d, i) => yScale(embeddings[i][1]))
        .attr('r', 10)
        .attr('fill', d => colorScale(d.Species))
        .attr('fill-opacity', 0.8)
      await myDelayer(1020)
    }
  }

  const dimensions = getDimensions()

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Interactive t-SNE Visualization</h2>
        <p className="text-lg">
          This program runs interactively t-SNE to reduce iris 4-dimensional data to 2 dimensions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              className={`btn mr-20 w-20 ${isPlaying ? '' : 'btn-success'}`}
              onClick={handlePlayClick}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn w-20 btn-secondary" onClick={handleResetClick}>
              Reset
            </button>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Learning Rate</h3>
            <input
              type="range"
              min="1"
              max="20"
              value={initialEpsilon}
              className="range h-3"
              step="1"
              onChange={(e) => handleSliderChange('epsilon', parseInt(e.target.value))}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Perplexity</h3>
            <input
              type="range"
              min="5"
              max="100"
              value={initialPerplexity}
              className="range h-3"
              step="5"
              onChange={(e) => handleSliderChange('perplexity', parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="w-full md:w-2/3">
          <svg ref={svgRef} width={dimensions.width} height={dimensions.height}>
            <g className="iris-tsne-plot-container"></g>
          </svg>
        </div>
      </div>
    </div>
  )
}