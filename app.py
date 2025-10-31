from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# 示例数据
data = []

@app.route('/')
def index():
    """主页面"""
    return render_template('index.html')

@app.route('/api/data', methods=['GET'])
def get_data():
    """获取数据API"""
    return jsonify({'status': 'success', 'data': data})

@app.route('/api/data', methods=['POST'])
def add_data():
    """添加数据API"""
    try:
        req_data = request.get_json()
        if 'message' in req_data:
            new_item = {
                'id': len(data) + 1,
                'message': req_data['message'],
                'timestamp': req_data.get('timestamp', '')
            }
            data.append(new_item)
            return jsonify({'status': 'success', 'data': new_item}), 201
        else:
            return jsonify({'status': 'error', 'message': '缺少message字段'}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/data/<int:item_id>', methods=['DELETE'])
def delete_data(item_id):
    """删除数据API"""
    global data
    original_len = len(data)
    data = [item for item in data if item['id'] != item_id]
    if len(data) < original_len:
        return jsonify({'status': 'success', 'message': '删除成功'}), 200
    else:
        return jsonify({'status': 'error', 'message': '未找到该数据'}), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

