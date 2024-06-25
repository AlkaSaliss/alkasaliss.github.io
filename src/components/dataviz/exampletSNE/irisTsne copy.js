import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { rowProcessor } from '../../../utils/irisUtils'

const tSNEJs = require('../../../utils/tsne')

function myDelayer(ms) {
  return new Promise(res => setTimeout(res, ms))
}

const IrisTsne = () => {
  const [data, setData] = useState(null)
  const [colorScale, setColorScale] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tsne, setTsne] = useState(null)
  const [circleGroup, setCircleGroup] = useState(null)
  const [epsilon, setEpsilon] = useState(10)
  const [perplexity, setPerplexity] = useState(10)

  const svgRef = useRef(null)
  const animationRef = useRef(null)

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

      const svg = d3.select(svgRef.current)
      const circleGroup = svg.select('.iris-tsne-plot-container')
        .selectAll('.circle-tsne-group')
        .data(dataTSNE, d => d.id)

      circleGroup.exit().remove()

      const circleGroupEnter = circleGroup.enter()
        .append('g')
        .attr('class', 'circle-tsne-group')

      const mergedCircleGroup = circleGroup.merge(circleGroupEnter)

      circleGroupEnter.append('circle')
        .attr('class', 'circle-tsne-point')
        .attr('cx', dimensions.innerWidth / 2)
        .attr('cy', dimensions.innerHeight / 2)
        .attr('r', 0)

      const embeddings = tsne.getSolution()
      const { xScale, yScale } = computeScales(embeddings)

      mergedCircleGroup.select('.circle-tsne-point')
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
      setCircleGroup(mergedCircleGroup)
    })
  }, [])

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animationRef.current)
    }
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying])

  const getDimensions = () => {
    const width = window.innerWidth * 0.65
    const height = window.innerHeight * 0.6
    const margins = { left: 70, right: 150, top: 50, bottom: 50 }
    const innerWidth = width - margins.left - margins.right
    const innerHeight = height - margins.top - margins.bottom

    return { width, height, margins, innerWidth, innerHeight }
  }

  const computeScales = (data) => {
    const dimensions = getDimensions()
    const xExtent = d3.extent(data.map(d => d[0]))
    const yExtent = d3.extent(data.map(d => d[1]))

    const xScale = d3.scaleLinear().domain(xExtent).range([5, dimensions.innerWidth - 5])
    const yScale = d3.scaleLinear().domain(yExtent).range([dimensions.innerHeight - 5, 5])

    return { xScale, yScale }
  }

  const handlePlayClick = () => {
    setIsPlaying((prev) => !prev)
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
    setEpsilon(10)
    setPerplexity(10)
    setTsne(newTsne)
  }

  const handleSliderChange = (param, value) => {
    if (param === 'epsilon') {
      setEpsilon(value)
    } else {
      setPerplexity(value)
    }
    const newTsne = tsne
    newTsne[param] = value
    setTsne(newTsne)
    setIsPlaying(false)
  }

  const animate = useCallback(() => {
    if (!isPlaying) return

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

    animationRef.current = requestAnimationFrame(() => animate())
  }, [isPlaying, tsne, circleGroup, colorScale])

  const dimensions = getDimensions()

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Interactive t-SNE Visualization for Iris Dataset</h2>
        <p className="text-lg">
          This program runs interactively t-SNE to reduce iris 4-dimensional dataset to 2 dimensions.
          t-SNE hyperparameters can be set using the left-side interactive widgets. Press Play to start ...
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <div className="flex justify-center mb-8">
            <button
              className={`btn btn-primary mr-4 ${isPlaying ? 'btn-active' : ''}`}
              onClick={handlePlayClick}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="btn btn-secondary" onClick={handleResetClick}>
              Reset
            </button>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Learning Rate</h3>
            <input
              type="range"
              min="1"
              max="20"
              value={epsilon}
              className="range"
              step="1"
              onChange={(e) => handleSliderChange('epsilon', parseInt(e.target.value))}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Perplexity</h3>
            <input
              type="range"
              min="5"
              max="100"
              value={perplexity}
              className="range"
              step="5"
              onChange={(e) => handleSliderChange('perplexity', parseInt(e.target.value))}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span>5</span>
              <span>50</span>
              <span>100</span>
            </div>
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

export default IrisTsne
