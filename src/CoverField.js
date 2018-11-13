import React from 'react'
import ReactDOM from 'react-dom'
import {css} from 'emotion'
import times from 'lodash/times'

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

const Attachment = ({url, width}) => (
    <div
        className={css`
            height: 180px;
            overflow: hidden;
            background-size: cover;
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

        const attachments = this.props.attachments.map(attachment => {
            return attachment.thumbnails.medium
        })

        const {width, index, hover} = this.state

        return (
            <div
                className={css`
                    width: 100%;
                    height: 180px;
                    position: relative;
                `}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}
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
                        />
                    ))}
                </AttachmentContainer>
                {attachments.map((attachment, index) => (
                    <link key={index} rel={'prefetch'} href={attachment}/>
                ))}
                <Indicators
                    active={hover}
                    index={index}
                    total={attachments.length}
                />
            </div>
        )
    }

    handleMouseEnter = () => {
        this.setState({
            hover: true
        })
    }

    handleMouseMove = (e) => {

        const params = {
            targetWidth: e.currentTarget.clientWidth,
            targetOffset: e.currentTarget.offsetLeft,
            clientOffset: e.nativeEvent.clientX
        }

        const {targetWidth, targetOffset, clientOffset} = params

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