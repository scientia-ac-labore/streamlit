/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react"
import { Metric as MetricProto } from "src/autogen/proto"
import { Theme } from "src/theme"
import Icon from "src/components/shared/Icon"
import { useTheme } from "emotion-theming"
import { ArrowDownward, ArrowUpward } from "@emotion-icons/material-outlined"
import {
  StyledTruncateText,
  StyledMetricLabelText,
  StyledMetricValueText,
  StyledMetricDeltaText,
} from "./styled-components"

export interface MetricProps {
  element: MetricProto
}

export default function Metric({ element }: MetricProps): ReactElement {
  const { colors, spacing }: Theme = useTheme()
  const { MetricColor, MetricDirection } = MetricProto

  let direction: any = null
  let color = ""

  switch (element.color) {
    case MetricColor.RED:
      color = colors.red
      break
    case MetricColor.GREEN:
      color = colors.green
      break
    // this must be grey
    default:
      color = colors.gray
      break
  }

  switch (element.direction) {
    case MetricDirection.DOWN:
      // direction = "▼"
      direction = ArrowDownward
      break
    case MetricDirection.UP:
      // direction = "▲"
      direction = ArrowUpward
      break
    // this must be none
    default:
      direction = null
      break
  }

  const deltaStyle = { color }
  return (
    <div data-testid="metric-container">
      <StyledMetricLabelText data-testid="stMetricLabel">
        <StyledTruncateText> {element.label} </StyledTruncateText>
      </StyledMetricLabelText>
      <StyledMetricValueText data-testid="stMetricValue">
        <StyledTruncateText> {element.body} </StyledTruncateText>
      </StyledMetricValueText>
      <StyledMetricDeltaText data-testid="stMetricDelta" style={deltaStyle}>
        <Icon content={direction} />
        <StyledTruncateText> {element.delta} </StyledTruncateText>
      </StyledMetricDeltaText>
    </div>
  )
}
