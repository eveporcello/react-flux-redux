import React from 'react'
import Note from './Note'

class Board extends React.Component {

    constructor() {
        super();

        this.state = {
            notes: []
        };

        this.nextId = this.nextId.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }

    componentWillMount() {
        var self = this;
        if (this.props.count) {
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" + this.props.count + "&start-with-lorem=1&callback=?", function (results) {
                results[0].split('. ').forEach(function (sentence) {
                    self.add(sentence.substring(0, 40));
                });
            });
        }
    }

    nextId() {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    }

    add(text) {
        var arr = this.state.notes;
        arr.push({
            id: this.nextId(),
            note: text
        });
        this.setState({notes: arr});
    }

    update(newText, i) {
        console.log("Updating item at index " + i + ", " + newText);
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({notes: arr});
    }

    remove(i) {
        console.log("Removing item at index " + i);
        var arr = this.state.notes;
        var n = arr.splice(i, 1);
        this.setState({notes: arr});
    }

    eachNote(note, i) {
        return <Note key={note.id}
                     index={i}
                     onChange={this.update}
                     onRemove={this.remove}>{note.note}</Note>
    }

    render() {
        return <div className="board">
            {this.state.notes.map(this.eachNote)}
            <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                    onClick={this.add.bind(null, "New Note")}/>
        </div>
    }

}

Board.propTypes = {
    count(props, propName) {

        if (typeof props[propName] !== "number") {
            return new Error('The count property must be a number');
        }

        if (props[propName] > 100) {
            return new Error('Creating ' + props[propName] + ' notes is ridiculous');
        }

    }
};

module.exports = Board;