const { User, Order, Product } = require('../Sequelize/Models.js');

// Função para mostrar todos os pedidos com paginação
const showOrders = async (req, res) => {
    try {
        console.log('Fetching orders...');

        // Extrair os parâmetros da query string
        const { limite = 10, pagina = 1 } = req.query;

        // Definir os valores permitidos para limite
        const validLimits = [5, 10, 30];
        const limit = parseInt(limite, 10);
        const page = parseInt(pagina, 10);

        if (!validLimits.includes(limit)) {
            return res.status(400).json({
                error: 'Valor inválido para limite. Use 5, 10 ou 30.',
            });
        }

        if (page < 1) {
            return res
                .status(400)
                .json({ error: 'A página deve ser maior ou igual a 1.' });
        }

        // Calcular o offset
        const offset = (page - 1) * limit;

        // Buscar ordens com paginação
        const orders = await Order.findAll({
            limit: limit,
            offset: offset,
            include: [{ model: Product }, { model: User }],
        });

        console.log('Orders fetched:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao buscar ordens:', error);
        res.status(500).json({ error: 'Erro ao buscar ordens.' });
    }
};

// Função para cadastrar um novo pedido
const createOrder = async (req, res) => {
    try {
        // Extrair os dados do corpo da requisição
        const { quantity, productId, userId } = req.body;

        // Verificar se o produto existe
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        // Verificar se o usuário existe
        const user = await User.findByPk(userId); // Vendedor do produto

        if (!user) {
            return res.status(404).json({ error: 'Vendedor não encontrado.' });
        }

        // Criar a ordem associada ao produto e ao usuário
        const newOrder = await Order.create({
            quantity: quantity, // Quantidade do produto
            productId: productId, // Id do produto a ser comprado
            userId: userId, // Id do comprador do produto
        });

        // Retornar uma resposta de sucesso com a nova ordem criada
        return res.status(201).json({
            message: 'Pedido criado com sucesso',
            order: newOrder,
        });
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        return res.status(500).json({
            error: 'Erro ao criar pedido. Por favor, tente novamente mais tarde.',
        });
    }
};

// Função para excluir um pedido
const deleteOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.orderId);

        // Verificar se a ordem existe
        const orderToDelete = await Order.findByPk(orderId);

        if (!orderToDelete) {
            return res.status(404).json({
                error: 'Pedido não encontrado.',
            });
        } else if (req.user.userId !== orderToDelete.userId) {
            // Verifica se o id do usuário é o id do dono da ordem
            return res.status(403).json({
                error: 'Apenas o dono do pedido pode excluí-lo.',
            });
        }

        // Excluir o pedido
        await Order.destroy({ where: { id: orderId } });

        // Retornar uma resposta de sucesso
        return res
            .status(200)
            .json({ message: 'Pedido excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir pedido:', error);
        return res.status(500).json({
            error: 'Erro ao excluir pedido. Por favor, tente novamente mais tarde.',
        });
    }
};

module.exports = {
    showOrders,
    createOrder,
    deleteOrder,
};
