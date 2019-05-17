import React from 'react'
import ReactDOM from 'react-dom'
import {css} from 'emotion'
import times from 'lodash/times'
import icons from './icons'

const AttachmentContainer = ({children, innerWidth, offset}) => (
    <div
        className={css`
            width: 100%;
            overflow: hidden;
            position: relative;
            transition: left 200ms ease 0s;
        `}
        style={{
            height: 180
        }}
    >
        <div
            className={css`
                position: absolute;
                display: flex;
            `}
            style={{
                height: 180,
                width: innerWidth,
                left: 0 - offset
            }}
        >
            {children}
        </div>
    </div>
)

const Attachment = ({url, width, coverFitTypeId}) => (
    <div
        className={css`
            height: 180px;
            overflow: hidden;
            background-position: center center;
            background-size: ${coverFitTypeId === 'crop' ? 'cover' : 'contain'};
            background-repeat: no-repeat;
            background-image: url(${url});
        `}
        style={{
            width
        }}
    />
)

const Indicator = ({active}) => (
    <div
        className={css`
            flex: 1 1 auto;
            min-width: 0;
            min-height: 0;
            padding: 2px;
            display: flex;
        `}
    >
        <div
            className={css`
                flex: 1 1 auto;
                min-width: 0;
                min-height: 0;
                border-radius: 9999px;
                background-color: ${active ? 'hsl(0,0%,100%)' : 'hsla(0,0%,100%,0.5)'};
            `}
        />
    </div>
)

const Indicators = ({active, index, total}) => (
    <div
        className={css`
            position: absolute;
            bottom: 2px;
            left: 2px;
            right: 2px;
            height: 6px;
            opacity: ${active ? '1' : '0'};
            transform: ${active ? 'translateY(0px)' : 'translateY(8px)'};
            display: flex;
            transition: .085s all ease-in;
            background-color: hsla(0,0%,0%,0.25);
            border-radius: 9999px;
        `}
    >
        {times(total).map(i => (
            <Indicator
                key={i}
                active={index === i}
            />
        ))}
    </div>
)

export default class CoverField extends React.Component {

    index = 0

    state = {
        index: 0,
        hover: false,
        width: null
    }

    componentDidMount() {

        const el = ReactDOM.findDOMNode(this)

        const width = el.clientWidth

        this.setState({
            width
        })
    }

    render() {

        const {height, coverFitTypeId, attachments} = this.props

        const {width, index, hover} = this.state

        const attachEvents = attachments && attachments.length > 1

        return (
            <div
                className={css`
                    width: 100%;
                    position: relative;
                    background-color: #f9f9f9;
                `}
                style={{
                    height
                }}
                onMouseEnter={attachEvents ? this.handleMouseEnter : null}
                onMouseLeave={attachEvents ? this.handleMouseLeave : null}
                onMouseMove={attachEvents ? this.handleMouseMove : null}
            >
                {attachments && attachments.length ? (
                    <div
                        className={css`
                            width: 100%;
                            height: 100%;
                        `}
                    >
                        <AttachmentContainer
                            offset={index * width}
                            innerWidth={attachments.length * width}
                        >
                            {attachments.map((attachment, index) => (
                                <Attachment
                                    key={index}
                                    url={attachment}
                                    width={width}
                                    coverFitTypeId={coverFitTypeId}
                                />
                            ))}
                        </AttachmentContainer>
                        {attachments.map((attachment, index) => (
                            <link key={index} rel={'prefetch'} href={attachment}/>
                        ))}
                        {attachments.length > 1 ? (
                            <Indicators
                                active={hover}
                                index={index}
                                total={attachments.length}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div
                        className={css`
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `}
                    >
                        {icons.image({width: 100, color: '#f0f0f0'})}
                    </div>
                )}
            </div>
        )
    }

    handleMouseEnter = () => {

        if (!this.props.attachments) return
        if (this.props.attachments.length < 2) return

        this.setState({
            hover: true
        })
    }

    handleMouseMove = (e) => {

        const {clientX: clientOffset} = e.nativeEvent
        const {x: targetOffset, width: targetWidth} = e.currentTarget.getBoundingClientRect()

        const offset = clientOffset - targetOffset
        const diff = offset / targetWidth
        const total = this.props.attachments.length

        const index = Math.floor(total * diff)


        if (index !== this.index) {
            this.setIndex(index)
        }
    }

    setIndex = index => {
        this.index = index
        this.setState({
            index
        })
    }

    handleMouseLeave = () => {
        this.setIndex(0)
        this.setState({
            hover: false
        })
    }
}